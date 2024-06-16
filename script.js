function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

function copyCommit() {
  const commitText = document.getElementById('api-response').innerText;
  navigator.clipboard.writeText(commitText).then(function() {
    alert('Commit copied to clipboard!');
  }, function(err) {
    console.error('Failed to copy: ', err);
  });
}

function fetchCommit() {
  const proxyUrl = 'https://corsproxy.io/?'; // CORS proxy
  const targetUrl = 'https://whatthecommit.com/index.txt';
  const apiUrl = proxyUrl + targetUrl;

  fetch(apiUrl)
    .then(response => response.text())
    .then(data => {
      const trimmedData = data.trim(); // Remove leading and trailing whitespace
      document.getElementById('api-response').innerText = trimmedData;
      document.getElementById('commit-text').style.display = 'inline'; // Display the sentence
    })
    .catch(error => {
      console.error('Error fetching commit: ', error);
    });
}

window.onload = function() {
  const currentDate = formatDate(new Date());
  document.getElementById('current-date').innerText = currentDate;

  fetchCommit();
};
