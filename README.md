# web3Radio-lite
Starter kit per creare la tua webradio decentralizzata con token gating su blockchain Ethereum.

![Web3 Radio Banner](https://i.ibb.co/placeholder-image/web3radio-banner.png)

## 🎵 Overview

web3Radio-lite è una versione semplificata di [web3radio.it](https://web3radio.it), progettata come punto di partenza per creare la tua piattaforma audio decentralizzata. La piattaforma combina:

- **Player Audio Decentralizzato**: Riproduce brani da una playlist condivisa sulla blockchain
- **Live Streaming Programmabile**: Gli utenti possono prenotare slot per trasmissioni in diretta
- **Token Gating**: Accesso esclusivo alle funzionalità per i possessori di NFT specifici
- **Interazione Web3**: Sistema di preferiti, donazioni e gestione di contenuti decentralizzato

## 📋 Caratteristiche Principali

- **Player Intelligente**: Verifica automaticamente se è in corso una diretta, altrimenti riproduce la playlist
- **Playlist Condivisa**: Gli utenti possono aggiungere, rimuovere e salvare brani
- **Calendario Live**: Interfaccia per prenotare slot temporali per trasmissioni
- **Sistema di Preferiti**: Gli utenti possono salvare i loro brani preferiti
- **Leaderboard**: Classifica dei brani più popolari
- **Donazioni**: Supporto diretto ai creatori tramite transazioni blockchain

## 🛠️ Tecnologie Utilizzate

- **Frontend**: React.js
- **Web3**: Ethers.js per l'interazione con la blockchain
- **Smart Contracts**: Solidity (basati su OpenZeppelin)
- **Token Gating**: Sistema basato su NFT per l'accesso esclusivo

## 📦 Struttura del Progetto

```
web3Radio-lite/
├─ contracts/                 # Smart contracts e utility per il deployment
│  ├─ Playlist.sol            # Contratto per gestire la playlist decentralizzata
│  ├─ ScheduleLive.sol        # Contratto per gestire prenotazioni live streaming
│  ├─ ExampleNFT.sol          # Esempio di contratto NFT per il token gating
│  ├─ playlistABI.json        # ABI del contratto Playlist
│  ├─ scheduleLiveABI.json    # ABI del contratto ScheduleLive
│  └─ DEPLOYMENT_GUIDE.md     # Guida al deployment dei contratti
├─ public/                    # Asset pubblici
├─ src/
│  ├─ components/             # Componenti React
│  │  ├─ AudioPlayer.js       # Player audio con controlli
│  │  ├─ Donate.js            # Componente per le donazioni ai creatori
│  │  ├─ MySaves.js           # Gestione brani preferiti dell'utente
│  │  ├─ Playlist.js          # Visualizzazione playlist decentralizzata
│  │  ├─ RemoveOwnSong.js     # Rimozione di brani aggiunti
│  │  ├─ SavesLeaderboard.js  # Classifica dei brani più salvati
│  │  ├─ ScheduleLive.js      # Programmazione delle dirette
│  │  └─ SubmitSongForm.js    # Form per aggiungere brani
│  ├─ App.js                  # Componente principale
│  ├─ config.js               # Configurazione (indirizzi contratti, rete, ecc.)
│  └─ ...                     # Altri file dell'app
├─ package.json               # Dipendenze e script
└─ README.md                  # Documentazione
```

## 🚀 Guida Rapida

### Prerequisiti

- [Node.js](https://nodejs.org/) (v14+)
- [npm](https://www.npmjs.com/) (v6+)
- [MetaMask](https://metamask.io/) o altro wallet Ethereum
- Account su una rete Ethereum (mainnet o testnet)

### Installazione

1. Clona il repository:
   ```bash
   git clone https://github.com/tuousername/web3Radio-lite.git
   cd web3Radio-lite
   ```

2. Installa le dipendenze:
   ```bash
   npm install
   ```

3. Configura il progetto:
   - Distribuisci i contratti (vedi sezione "Deployment dei Contratti")
   - Aggiorna il file `src/config.js` con gli indirizzi dei contratti

4. Avvia l'app in modalità sviluppo:
   ```bash
   npm start
   ```

L'app sarà accessibile all'indirizzo [http://localhost:3000](http://localhost:3000).

## 🔗 Deployment dei Contratti

Prima di utilizzare l'applicazione, è necessario distribuire i contratti sulla blockchain. Puoi farlo in due modi:

### Utilizzo di Remix IDE (Semplice)

1. Apri [Remix IDE](https://remix.ethereum.org/)
2. Carica i file `Playlist.sol` e `ScheduleLive.sol` dalla cartella `contracts`
3. Compila i contratti e distribuitli specificando l'indirizzo del tuo contratto NFT
4. Prendi nota degli indirizzi dei contratti distribuiti

### Utilizzo di Hardhat (Avanzato)

Per un approccio più professionale, puoi utilizzare Hardhat seguendo la guida dettagliata in [contracts/DEPLOYMENT_GUIDE.md](contracts/DEPLOYMENT_GUIDE.md).

## ⚙️ Configurazione

Dopo aver distribuito i contratti, configura l'app modificando il file `src/config.js`:

```javascript
export const CONTRACT_ADDRESSES = {
  PLAYLIST_ADDRESS: "0xTUO_INDIRIZZO_PLAYLIST",
  SCHEDULE_LIVE_ADDRESS: "0xTUO_INDIRIZZO_SCHEDULELIVE",
  NFT_ADDRESS: "0xTUO_INDIRIZZO_NFT",
};

export const NETWORK_CONFIG = {
  CHAIN_ID: "11155111", // Sepolia Testnet (cambia in base alla tua rete)
  NETWORK_NAME: "Sepolia Testnet",
  EXPLORER_URL: "https://sepolia.etherscan.io",
};
```

## 📱 Utilizzo dell'App

1. **Connetti il wallet**: Al caricamento della pagina, connetti il tuo wallet Ethereum
2. **Ascolta**: Il player riprodurrà automaticamente contenuti live (se disponibili) o brani dalla playlist
3. **Aggiungi brani**: Usa il form "Aggiungi Brano" per contribuire alla playlist decentralizzata
4. **Programma una diretta**: Prenota uno slot temporale per trasmettere live
5. **Salva i preferiti**: Aggiungi brani ai tuoi preferiti e visualizza la classifica
6. **Dona**: Supporta i creatori con donazioni in criptovaluta

## 🔒 Token Gating

L'accesso alle funzionalità dell'app è limitato ai possessori di un NFT specifico. Puoi:

1. Utilizzare il contratto di esempio `ExampleNFT.sol` come punto di partenza
2. Integrarti con una collezione NFT esistente
3. Personalizzare il meccanismo di token gating in base alle tue esigenze

## 🤝 Contributi

I contributi sono benvenuti! Ecco come puoi contribuire:

1. Fork del repository
2. Crea un branch per le tue modifiche (`git checkout -b feature/amazing-feature`)
3. Committa i cambiamenti (`git commit -m 'Aggiunta nuova feature'`)
4. Push al branch (`git push origin feature/amazing-feature`)
5. Apri una Pull Request

## 📜 Licenza

Distribuito con licenza MIT. Vedi `LICENSE` per maggiori informazioni.

## 📞 Contatti

Per domande o supporto:
- Visita [web3radio.it](https://web3radio.it)
- Apri un issue su GitHub

---

Costruisci la tua webradio decentralizzata e porta l'audio nel Web3! 🎧🔊
