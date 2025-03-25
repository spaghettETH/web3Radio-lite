// Configurazione degli indirizzi dei contratti
// Modifica questi valori con gli indirizzi dei tuoi contratti dopo il deployment

export const CONTRACT_ADDRESSES = {
  // Indirizzo del contratto Playlist
  PLAYLIST_ADDRESS: "", // Esempio: "0x1234567890abcdef1234567890abcdef12345678"
  
  // Indirizzo del contratto ScheduleLive
  SCHEDULE_LIVE_ADDRESS: "", // Esempio: "0xabcdef1234567890abcdef1234567890abcdef12"
  
  // Indirizzo del contratto NFT per il token gating
  NFT_ADDRESS: "", // Esempio: "0x7890abcdef1234567890abcdef1234567890abcde"
};

// Configurazione della rete Ethereum
export const NETWORK_CONFIG = {
  // ID della rete (1 = Ethereum Mainnet, 11155111 = Sepolia Testnet, 5 = Goerli, ecc.)
  CHAIN_ID: "11155111",
  
  // Nome della rete
  NETWORK_NAME: "Sepolia Testnet",
  
  // URL di un explorer per esplorare gli indirizzi e le transazioni
  EXPLORER_URL: "https://sepolia.etherscan.io",
};

// Impostazioni dell'app
export const APP_SETTINGS = {
  // Intervallo in millisecondi per controllare le live programmate
  LIVE_CHECK_INTERVAL: 30000, // 30 secondi
  
  // Titolo dell'app
  APP_TITLE: "Decentralized Radio Player",
}; 