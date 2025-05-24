async function connectWallet() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      document.getElementById('account').textContent = 'Connected: ' + accounts[0];
    } catch (err) {
      alert('Connection rejected');
    }
  } else {
    alert('MetaMask or a compatible wallet not found');
  }
}

document.getElementById('connect').onclick = connectWallet;

document.getElementById('heads').onclick = () => play('heads');
document.getElementById('tails').onclick = () => play('tails');

function play(choice) {
  const amount = parseFloat(document.getElementById('betAmount').value);
  if (!amount || amount < 0.1 || amount > 5) {
    alert('Enter a valid amount between 0.1 and 5');
    return;
  }
  const result = Math.random() < 0.5 ? 'heads' : 'tails';
  const win = result === choice;
  document.getElementById('result').textContent = win ? 'You win! 2x MON sent!' : 'You lose. MON sent to owner.';
}