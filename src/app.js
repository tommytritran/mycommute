'use strict';

import { getSettings } from './popup';

const baseUrl = "https://www.google.com/maps/dir/?api=1&";

async function urlBuilder(address){
  const settings = await getSettings();
  const param ={
    origin: address,
    destination: settings.from,
    travelmode : settings.travelMode
  }

  const searchParams = new URLSearchParams(param);
  return baseUrl + searchParams;

}

function createAnchorTag(url, address){
  const anchorTag = document.createElement('a');
  anchorTag.setAttribute("href", url);
  anchorTag.setAttribute("target", "_blank");
  anchorTag.setAttribute("res", "noo")
  anchorTag.innerHTML = address;
  return anchorTag;
}

(async function injectAnchorTag () {
  const addressElement = document.querySelector("#realestateClassifiedContainer > div:nth-child(2) > div > div.grid__unit.u-r-size2of3 > div > section:nth-child(2) > p");
  const address = addressElement.innerHTML;
  const mapAddressElement = document.querySelector("#realestateClassifiedContainer > div:nth-child(2) > div > div.grid__unit.u-r-size2of3 > div > section.u-mt32 > p");

  const url = await urlBuilder(address);

  const atag = createAnchorTag(url, address);
  const atag1 = createAnchorTag(url, address);
  atag1.setAttribute("class", "u-mh16");

  addressElement.replaceWith(atag);
  mapAddressElement.replaceWith(atag1)
})();
