import { html } from '@polymer/lit-element';
import CSS from './_components.download-link-css';
import getText from '../../../i18n/getText';

export default function DownloadLink ({ downloadLink, display = '' }) {
  const isPlainText = display === 'plaintext';
  const info = downloadLink ? getText('text.downloadLink') : getText('errors.noDownloadLink');

  // TODO: better handle this dynamic class (cf npm classnames)
  const classes = [
    'buv-c-download-link',
    'buv-o-button-link',
    !downloadLink ? 'is-disabled' : '',
    isPlainText ? '' : 'buv-c-download-link--icon'
  ].join(' ');

  const getJson = () => {
    const filename = downloadLink.split("/").pop().split("?")[0];
    fetch(downloadLink)
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename + '.json');
      document.body.appendChild(link);
      link.click();
    });
  }

  return html`
    ${CSS}
    <a id="download-link" onclick="${getJson}" class$='${classes}' title$='${info}' aria-disabled?='${!downloadLink}' download="certificate.json">
      <span class$='${isPlainText ? 'buv-o-button-link__label' : 'buv-u-visually-hidden'}'>${info}</span>
    </a>`;
}
