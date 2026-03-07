const SOURCE_URL = 'https://raw.githubusercontent.com/kurantoB/liferoulette/refs/heads/master/liferoulette.json';

const $status = $('#status');
const $output = $('#output');

function loadLifeRouletteJson() {
	$status.text('Fetching JSON...');
	$.ajax({
		url: SOURCE_URL,
		dataType: 'json',
		cache: false,
		success(data) {
			for (const outputChild of processData(data)) {
				$output.append(outputChild);
			}
			$status.css('display', 'none');
		},
		error(jqXHR, textStatus, errorThrown) {
			$status.text('Failed to load JSON');
			$output.text(textStatus + (errorThrown ? ': ' + errorThrown : ''));
			console.error(textStatus, errorThrown);
		}
	});
}

function processData(data) {
	let result = [];
	for (const entry of data) {
		const $entryDiv = $('<div>');
		result.push($entryDiv);
		$entryDiv.append($('<hr>'))
		$entryDiv.append($('<h2>').text(entry.category));
        if (entry.bank && entry.bank.length > 0) {
		    const $bankContents = addFromBank(entry.bank);
		    $entryDiv.append($bankContents);
        }
	}
	return result;
}

function addFromBank(bank) {
    const $bankContents = $('<div>');
    const randomItemIndex = Math.floor(Math.random() * bank.length);
    const $randomItem = $('<p>').text(bank[randomItemIndex]);
    $bankContents.append($randomItem);
    return $bankContents;
}

$(document).ready(loadLifeRouletteJson);