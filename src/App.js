import React, { useState, useEffect, useCallback } from "react";
import { BrowserProvider, Contract } from "ethers";
import Playlist from "./components/Playlist";
import AudioPlayer from "./components/AudioPlayer";
import SubmitSongForm from "./components/SubmitSongForm";
import RemoveOwnSong from "./components/RemoveOwnSong";
import MySaves from "./components/MySaves";
import SavesLeaderboard from "./components/SavesLeaderboard";
import Donate from "./components/Donate";
import ScheduleLive from "./components/ScheduleLive";

// Importare ABI dai file JSON
import playlistABI from '../contracts/playlistABI.json';
import scheduleLiveABI from '../contracts/scheduleLiveABI.json';

// La configurazione degli indirizzi dei contratti sarà gestita in un file separato
// Importare dalla configurazione personalizzata (verrà creata successivamente)
import { CONTRACT_ADDRESSES } from './config';

const App = () => {
  const [provider, setProvider] = useState(null);
  const [playlistContract, setPlaylistContract] = useState(null);
  const [scheduleLiveContract, setScheduleLiveContract] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [mySongs, setMySongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // Initialize Ethereum provider and contracts
  const initializeProvider = useCallback(async () => {
    if (window.ethereum) {
      try {
        const _provider = new BrowserProvider(window.ethereum);
        await _provider.send("eth_requestAccounts", []);
        const signer = await _provider.getSigner();

        // Inizializzare i contratti solo se gli indirizzi sono configurati
        if (CONTRACT_ADDRESSES.PLAYLIST_ADDRESS && CONTRACT_ADDRESSES.SCHEDULE_LIVE_ADDRESS) {
          // Initialize contracts
          const _playlistContract = new Contract(CONTRACT_ADDRESSES.PLAYLIST_ADDRESS, playlistABI, signer);
          const _scheduleLiveContract = new Contract(CONTRACT_ADDRESSES.SCHEDULE_LIVE_ADDRESS, scheduleLiveABI, signer);

          setPlaylistContract(_playlistContract);
          setScheduleLiveContract(_scheduleLiveContract);
        } else {
          console.warn("Contract addresses are not configured");
          alert("Contratti non configurati. Impostare gli indirizzi nel file di configurazione.");
        }
        
        setProvider(_provider);
        setIsConnected(true);
      } catch (error) {
        console.error("Error initializing provider:", error);
        alert("Failed to connect to MetaMask.");
      }
    } else {
      alert("Please install MetaMask!");
    }
  }, []);

  // Fetch the playlist from the Playlist contract
  const fetchPlaylist = useCallback(async () => {
    if (playlistContract) {
      try {
        const playlistIds = await playlistContract.viewPlaylist();
        const playlistData = await Promise.all(
          playlistIds.map(async (id) => {
            const song = await playlistContract.getSongDetails(id);
            return song.isActive
              ? { id: song.id.toString(), uri: song.uri, img: song.img, title: song.title, submitter: song.submitter }
              : null;
          })
        );
        setPlaylist(playlistData.filter((song) => song)); // Filter out inactive songs
      } catch (error) {
        console.error("Error fetching playlist:", error);
        setPlaylist([]);
      }
    }
  }, [playlistContract]);

  // Fetch user's submitted songs
  const fetchUserSongs = useCallback(async () => {
    if (playlistContract && provider) {
      try {
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();

        const userSongIds = await playlistContract.getUserSongs(userAddress);
        const userSongs = await Promise.all(
          userSongIds.map(async (id) => {
            const song = await playlistContract.getSongDetails(id);
            return song.isActive
              ? { id: song.id.toString(), title: song.title || "(Untitled)", uri: song.uri, img: song.img }
              : null;
          })
        );

        setMySongs(userSongs.filter((song) => song)); // Exclude inactive songs
      } catch (error) {
        console.error("Error fetching user's songs:", error);
        setMySongs([]);
      }
    }
  }, [playlistContract, provider]);

  // Initialize provider on component mount
  useEffect(() => {
    initializeProvider();
  }, [initializeProvider]);

  // Fetch playlist and user songs when the Playlist contract is ready
  useEffect(() => {
    if (playlistContract) {
      fetchPlaylist();
      fetchUserSongs();
    }
  }, [playlistContract, fetchPlaylist, fetchUserSongs]);

  return (
    <div>
      <h1>Decentralized Playlist Player</h1>
      {isConnected ? (
        <>
          <AudioPlayer
            playlist={playlist}
            setCurrentSong={(song) => {
              console.log("Setting current song:", song);
              setCurrentSong(song);
            }}
          />
          {currentSong && currentSong.submitter ? (
            <Donate creatorAddress={currentSong.submitter} />
          ) : (
            <p>No creator information available.</p>
          )}
          <Playlist playlist={playlist} />
          <SubmitSongForm
            contract={playlistContract}
            fetchPlaylist={fetchPlaylist}
            fetchUserSongs={fetchUserSongs}
          />
          <RemoveOwnSong
            contract={playlistContract}
            mySongs={mySongs}
            fetchUserSongs={fetchUserSongs}
          />
          <MySaves contract={playlistContract} currentSong={currentSong} />
          <SavesLeaderboard contract={playlistContract} />
          <ScheduleLive contract={scheduleLiveContract} />
        </>
      ) : (
        <p>Please connect to MetaMask.</p>
      )}
    </div>
  );
};

export default App;
