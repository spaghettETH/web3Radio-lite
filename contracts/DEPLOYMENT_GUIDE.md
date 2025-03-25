# Guida al Deployment dei Contratti

Questa guida spiega come distribuire i contratti Playlist e ScheduleLive utilizzando Hardhat.

## Prerequisiti

1. Node.js installato
2. Account Ethereum con ETH (può essere su una rete di test come Sepolia)
3. Chiave privata per il deployment
4. API key di un provider Ethereum (es. Infura, Alchemy)

## Configurazione dell'ambiente di sviluppo

1. Installa Hardhat nel progetto:

```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
```

2. Inizializza Hardhat:

```bash
npx hardhat init
```

3. Seleziona "Create a JavaScript project"

4. Configura il file `hardhat.config.js` con le tue credenziali:

```javascript
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

// Crea un file .env con queste variabili definite
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const INFURA_API_KEY = process.env.INFURA_API_KEY || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [PRIVATE_KEY]
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  }
};
```

5. Installa le dipendenze per le variabili d'ambiente:

```bash
npm install --save-dev dotenv
```

6. Crea un file `.env` nella root del progetto (assicurati di aggiungerlo a `.gitignore`):

```
PRIVATE_KEY=la_tua_chiave_privata_senza_0x
INFURA_API_KEY=la_tua_api_key_infura
ETHERSCAN_API_KEY=la_tua_api_key_etherscan
```

## Preparazione dei contratti

1. Crea una cartella `contracts` nel progetto Hardhat (se non esiste già)
2. Copia i file `Playlist.sol` e `ScheduleLive.sol` nella cartella `contracts`
3. Assicurati che le dipendenze OpenZeppelin siano installate:

```bash
npm install --save-dev @openzeppelin/contracts
```

## Script di deployment

1. Crea uno script di deployment nella cartella `scripts`:

```javascript
// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
  console.log("Iniziando il deployment dei contratti...");

  // Indirizzo del contratto NFT che userai per il token gating
  const nftContractAddress = "0xYOUR_NFT_CONTRACT_ADDRESS";

  // Deploy del contratto Playlist
  const Playlist = await ethers.getContractFactory("DecentraPlaylist");
  const playlist = await Playlist.deploy(nftContractAddress);
  await playlist.deployed();
  console.log("Contratto DecentraPlaylist deployato a:", playlist.address);

  // Deploy del contratto ScheduleLive
  const ScheduleLive = await ethers.getContractFactory("DecentraLiveSchedule");
  const scheduleLive = await ScheduleLive.deploy(nftContractAddress);
  await scheduleLive.deployed();
  console.log("Contratto DecentraLiveSchedule deployato a:", scheduleLive.address);

  console.log("Deployment completato!");
  
  console.log("\nConfigura src/config.js con questi indirizzi:");
  console.log(`PLAYLIST_ADDRESS: "${playlist.address}",`);
  console.log(`SCHEDULE_LIVE_ADDRESS: "${scheduleLive.address}",`);
  console.log(`NFT_ADDRESS: "${nftContractAddress}",`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

## Esecuzione del deployment

1. Esegui il comando di deployment specificando la rete:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

2. Dopo il deployment, otterrai gli indirizzi dei contratti distribuiti. Usa questi indirizzi per configurare il file `src/config.js` nell'app React.

## Verifica dei contratti (opzionale)

Puoi verificare i tuoi contratti su Etherscan usando il plugin Hardhat:

```bash
npx hardhat verify --network sepolia INDIRIZZO_CONTRATTO PARAMETRI_COSTRUTTORE
```

Esempio:

```bash
npx hardhat verify --network sepolia 0xTUO_CONTRATTO_PLAYLIST 0xTUO_CONTRATTO_NFT
npx hardhat verify --network sepolia 0xTUO_CONTRATTO_SCHEDULELIVE 0xTUO_CONTRATTO_NFT
```

## Note aggiuntive

- Assicurati di avere ETH sufficienti per le operazioni di deployment
- Ogni rete ha requisiti differenti per i gas limit/prezzo
- Prima di distribuire sulla mainnet, testa accuratamente su una rete di test
- Non condividere mai la tua chiave privata o il file .env 