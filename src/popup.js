'use strict';

import './popup.css';


(async function addListener(){
    const settings = await getSettings();
    document.getElementById('from').value = settings.from;
    document.getElementById('travelMode').value = settings.travelMode;

    document.getElementById("form").addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
            from: e.target.elements['from'].value,
            travelMode:e.target.elements['travelMode'].value
        };
        storeSettings(data);
        alert("Instillinger oppdatert! Last siden inn på nytt for å få oppdatert lenke.");
    });
})();

export function getSettings() {
    return new Promise((resolve) => {
        chrome.storage.local.get('settings', (result) => {
            if (result.settings) {
                resolve(result.settings);
            } else {
                resolve({
                    from: "Oslo",
                    travelMode: "transit",
                });
            }
        });
    });
}

function storeSettings(settings) {
    return new Promise((resolve) => {
        chrome.storage.local.set({
            'settings': settings
        }, () => {
            resolve();
        });
    });
}

