let provider;
let signer;
let contract;

document.getElementById('connect').onclick = async () => {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    document.getElementById('account').textContent = "Connected: " + await signer.getAddress();
    contract = new ethers.Contract("0x7D29897c4BBE7f540E233C9198f0906b6E3d239d", [
  {
    "inputs": [
      {
        "internalType": "bool",
        "name": "guess",
        "type": "bool"
      }
    ],
    "name": "flip",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
], signer);
  } else {
    alert('MetaMask not found');
  }
};

document.getElementById('heads').onclick = () => bet(true);
document.getElementById('tails').onclick = () => bet(false);

async function bet(choice) {
  const amount = parseFloat(document.getElementById('betAmount').value);
  if (!amount || amount < 0.1 || amount > 5) {
    alert('Enter a valid amount between 0.1 and 5 MON');
    return;
  }
  try {
    const tx = await contract.flip(choice, {
      value: ethers.utils.parseEther(amount.toString())
    });
    document.getElementById('result').textContent = 'Transaction sent... waiting for result';
    await tx.wait();
    document.getElementById('result').textContent = 'Transaction confirmed! Check wallet for result.';
  } catch (err) {
    document.getElementById('result').textContent = 'Transaction failed or cancelled.';
    console.error(err);
  }
}