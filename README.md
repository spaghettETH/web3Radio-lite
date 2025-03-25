# web3Radio-lite
Starter kit to create your own decentralized web radio with token gating on Ethereum blockchain.

![Web3 Radio Banner](https://i.ibb.co/placeholder-image/web3radio-banner.png)

## 🎵 Overview

web3Radio-lite is a simplified version of [web3radio.it](https://web3radio.it), designed as a starting point to create your own decentralized audio platform. The platform combines:

- **Decentralized Audio Player**: Plays tracks from a blockchain-shared playlist
- **Programmable Live Streaming**: Users can book slots for live broadcasts
- **Token Gating**: Exclusive access to features for specific NFT holders
- **Web3 Interaction**: Favorites system, donations, and decentralized content management

## 📋 Key Features

- **Smart Player**: Automatically checks if there's a live broadcast, otherwise plays from the playlist
- **Shared Playlist**: Users can add, remove, and save tracks
- **Live Calendar**: Interface to book time slots for broadcasts
- **Favorites System**: Users can save their favorite tracks
- **Leaderboard**: Ranking of the most popular tracks
- **Donations**: Direct support to creators through blockchain transactions

## 🛠️ Technologies Used

- **Frontend**: React.js
- **Web3**: Ethers.js for blockchain interaction
- **Smart Contracts**: Solidity (based on OpenZeppelin)
- **Token Gating**: NFT-based system for exclusive access

## 📦 Project Structure

```
web3Radio-lite/
├─ contracts/                 # Smart contracts and deployment utilities
│  ├─ Playlist.sol            # Contract to manage the decentralized playlist
│  ├─ ScheduleLive.sol        # Contract to manage live streaming bookings
│  ├─ ExampleNFT.sol          # Example NFT contract for token gating
│  ├─ playlistABI.json        # Playlist contract ABI
│  ├─ scheduleLiveABI.json    # ScheduleLive contract ABI
│  └─ DEPLOYMENT_GUIDE.md     # Contract deployment guide
├─ public/                    # Public assets
├─ src/
│  ├─ components/             # React components
│  │  ├─ AudioPlayer.js       # Audio player with controls
│  │  ├─ Donate.js            # Component for creator donations
│  │  ├─ MySaves.js           # User's favorite tracks management
│  │  ├─ Playlist.js          # Decentralized playlist visualization
│  │  ├─ RemoveOwnSong.js     # Removal of added tracks
│  │  ├─ SavesLeaderboard.js  # Ranking of most saved tracks
│  │  ├─ ScheduleLive.js      # Live broadcast scheduling
│  │  └─ SubmitSongForm.js    # Form to add tracks
│  ├─ App.js                  # Main component
│  ├─ config.js               # Configuration (contract addresses, network, etc.)
│  └─ ...                     # Other app files
├─ package.json               # Dependencies and scripts
└─ README.md                  # Documentation
```

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+)
- [npm](https://www.npmjs.com/) (v6+)
- [MetaMask](https://metamask.io/) or other Ethereum wallet
- Account on an Ethereum network (mainnet or testnet)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/web3Radio-lite.git
   cd web3Radio-lite
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the project:
   - Deploy the contracts (see "Contract Deployment" section)
   - Update the `src/config.js` file with the contract addresses

4. Start the app in development mode:
   ```bash
   npm start
   ```

The app will be accessible at [http://localhost:3000](http://localhost:3000).

## 🔗 Contract Deployment

Before using the application, you need to deploy the contracts on the blockchain. You can do this in two ways:

### Using Remix IDE (Simple)

1. Open [Remix IDE](https://remix.ethereum.org/)
2. Upload the `Playlist.sol` and `ScheduleLive.sol` files from the `contracts` folder
3. Compile the contracts and deploy them specifying your NFT contract address
4. Take note of the deployed contract addresses

### Using Hardhat (Advanced)

For a more professional approach, you can use Hardhat by following the detailed guide in [contracts/DEPLOYMENT_GUIDE.md](contracts/DEPLOYMENT_GUIDE.md).

## ⚙️ Configuration

After deploying the contracts, configure the app by modifying the `src/config.js` file:

```javascript
export const CONTRACT_ADDRESSES = {
  PLAYLIST_ADDRESS: "0xYOUR_PLAYLIST_ADDRESS",
  SCHEDULE_LIVE_ADDRESS: "0xYOUR_SCHEDULELIVE_ADDRESS",
  NFT_ADDRESS: "0xYOUR_NFT_ADDRESS",
};

export const NETWORK_CONFIG = {
  CHAIN_ID: "11155111", // Sepolia Testnet (change based on your network)
  NETWORK_NAME: "Sepolia Testnet",
  EXPLORER_URL: "https://sepolia.etherscan.io",
};
```

## 📱 Using the App

1. **Connect wallet**: When the page loads, connect your Ethereum wallet
2. **Listen**: The player will automatically play live content (if available) or tracks from the playlist
3. **Add tracks**: Use the "Add Track" form to contribute to the decentralized playlist
4. **Schedule a broadcast**: Book a time slot to broadcast live
5. **Save favorites**: Add tracks to your favorites and view the rankings
6. **Donate**: Support creators with cryptocurrency donations

## 🔒 Token Gating

Access to the app's features is limited to holders of a specific NFT. You can:

1. Use the example contract `ExampleNFT.sol` as a starting point
2. Integrate with an existing NFT collection
3. Customize the token gating mechanism according to your needs

## 🤝 Contributions

Contributions are welcome! Here's how you can contribute:

1. Fork the repository
2. Create a branch for your changes (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

For questions or support:
- Visit [web3radio.it](https://web3radio.it)
- Open an issue on GitHub

---

Build your own decentralized web radio and bring audio to Web3! 🎧🔊
