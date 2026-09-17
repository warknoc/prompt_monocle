document.addEventListener('DOMContentLoaded', () => {
  const turnCounter = document.getElementById('turnCounter');
  const progressBar = document.getElementById('progressBar');
  const btnIncrement = document.getElementById('btnIncrement');
  const btnReset = document.getElementById('btnReset');
  const anchorInput = document.getElementById('anchorInput');
  const btnStamp = document.getElementById('btnStamp');
  const statusToast = document.getElementById('statusToast');

  const MAX_SAFE_TURNS = 12;

  // Restore saved state
  chrome.storage.local.get(['turns', 'anchors'], (result) => {
    const turns = result.turns || 0;
    const anchors = result.anchors || '';
    anchorInput.value = anchors;
    updateHUD(turns);
  });

  // Save anchors automatically on input
  anchorInput.addEventListener('input', () => {
    chrome.storage.local.set({ anchors: anchorInput.value });
  });

  // Turn tracking
  btnIncrement.addEventListener('click', () => {
    chrome.storage.local.get(['turns'], (result) => {
      const current = (result.turns || 0) + 1;
      chrome.storage.local.set({ turns: current });
      updateHUD(current);
    });
  });

  btnReset.addEventListener('click', () => {
    chrome.storage.local.set({ turns: 0 });
    updateHUD(0);
  });

  // Stamp assembly & clipboard action
  btnStamp.addEventListener('click', () => {
    chrome.storage.local.get(['turns', 'anchors'], (result) => {
      const turns = result.turns || 0;
      const anchors = result.anchors || 'None defined.';
      
      const stampBlock = `---
[SYSTEM REINFORCEMENT - TURN ${turns}]
Active Bounds & Anchors:
${anchors}
---`;

      navigator.clipboard.writeText(stampBlock).then(() => {
        statusToast.style.display = 'block';
        setTimeout(() => {
          statusToast.style.display = 'none';
        }, 2000);
      });
    });
  });

  function updateHUD(count) {
    turnCounter.textContent = `Turn: ${count} / ${MAX_SAFE_TURNS}`;
    const pct = Math.min((count / MAX_SAFE_TURNS) * 100, 100);
    progressBar.style.width = pct + '%';

    if (count < 6) {
      progressBar.style.backgroundColor = '#38bdf8'; // Cyan
    } else if (count < 10) {
      progressBar.style.backgroundColor = '#d29922'; // Caution Amber
    } else {
      progressBar.style.backgroundColor = '#f85149'; // Drift Warning Red
    }
  }
});
