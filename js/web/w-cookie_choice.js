/*
 Copyright 2014 Google Inc. All rights reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/**
 * Cookie Choice Banner
 * include `js/web/w-cookie_choice.js`, `css/web/w-cookie_choice.css` or if u use build files this are yet included
     <script>
        document.addEventListener('DOMContentLoaded', function (event) {
            cookieChoices.showCookieConsentBar("Questo sito utilizza i cookies per migliorare l'esperienza di navigazione. Utilizzando il sito l'utente accetta tutti i cookies.",
                'OK', 'Privacy Policy', "/privacy-url");
        });
     </script>
 *
 * En: This site uses cookies to improve the browsing experience. By using this site you agree to all cookies
 * Fr: Ce site utilise des cookies pour améliorer l'expérience de navigation. En utilisant ce site, vous acceptez tous les cookies
 * De: Diese Seite benutzt Cookies , um den Browser-Erfahrung zu verbessern. Durch die Nutzung der Website erklären Sie sich mit allen Cookies
 * Es: Este sitio utiliza cookies para mejorar la experiencia de navegación. Al usar este sitio usted acepta todas las cookies
 * Hu: Ez a webhely cookie-kat használ a böngészési élmény javítása érdekében. Az oldal használatával elfogadja az összes cookie-t
 * Nl: Deze site maakt gebruik van cookies om de browser-ervaring te verbeteren. Door deze site te gebruiken, gaat u akkoord met alle cookies
 * Pl: Ta witryna używa plików cookie, aby poprawić doświadczenie przeglądania. Korzystając z tej witryny zgadzasz się na wszystkie pliki cookie
 * Pt: Este site usa cookies para melhorar a experiência de navegação. Ao usar este site você concorda com todos os cookies
 * Ru: Нажимая кнопку или продолжая использовать сайт, вы разрешаете нам собирать информацию посредством использования файлов «cookie»
 *
 */
(function (window) {

    if (!!window.cookieChoices) {
        return window.cookieChoices;
    }

    var document = window.document;
    // IE8 does not support textContent, so we should fallback to innerText.
    var supportsTextContent = 'textContent' in document.body;
//  var supportsTextContent;
    /*
     if( document.body.textContent ) {
     supportsTextContent=true;
     }
     else{
     supportsTextContent=false;
     }
     */

    var cookieChoices = (function () {

        var cookieName = 'displayCookieConsent';
        var cookieConsentId = 'cookieChoiceInfo';
        var dismissLinkId = 'cookieChoiceDismiss';

        function _createHeaderElement(cookieText, dismissText, linkText, linkHref) {
            //var butterBarStyles = 'position:fixed;width:100%;background-color:#eee;' +
            //    'margin:0; left:0; bottom:0;padding:4px;z-index:1000;text-align:center;';

            var cookieConsentElement = document.createElement('div');
            cookieConsentElement.id = cookieConsentId;
            //lo stile lo imposto da css
            //cookieConsentElement.style.cssText = butterBarStyles;
            cookieConsentElement.appendChild(_createConsentText(cookieText));

            if (!!linkText && !!linkHref) {
                cookieConsentElement.appendChild(_createInformationLink(linkText, linkHref));
            }
            cookieConsentElement.appendChild(_createDismissLink(dismissText));
            return cookieConsentElement;
        }

        function _createDialogElement(cookieText, dismissText, linkText, linkHref) {
            var glassStyle = 'position:fixed;width:100%;height:100%;z-index:999;' +
                'top:0;left:0;opacity:0.5;filter:alpha(opacity=50);' +
                'background-color:#ccc;';
            var dialogStyle = 'z-index:1000;position:fixed;left:50%;top:50%';
            var contentStyle = 'position:relative;left:-50%;margin-top:-25%;' +
                'background-color:#fff;padding:20px;box-shadow:4px 4px 25px #888;';

            var cookieConsentElement = document.createElement('div');
            cookieConsentElement.id = cookieConsentId;

            var glassPanel = document.createElement('div');
            glassPanel.style.cssText = glassStyle;

            var content = document.createElement('div');
            content.style.cssText = contentStyle;

            var dialog = document.createElement('div');
            dialog.style.cssText = dialogStyle;

            var dismissLink = _createDismissLink(dismissText);
            dismissLink.style.display = 'block';
            dismissLink.style.textAlign = 'right';
            dismissLink.style.marginTop = '8px';

            content.appendChild(_createConsentText(cookieText));
            if (!!linkText && !!linkHref) {
                content.appendChild(_createInformationLink(linkText, linkHref));
            }
            content.appendChild(dismissLink);
            dialog.appendChild(content);
            cookieConsentElement.appendChild(glassPanel);
            cookieConsentElement.appendChild(dialog);
            return cookieConsentElement;
        }

        function _setElementText(element, text) {
            if (supportsTextContent) {
                element.textContent = text;
            } else {
                element.innerText = text;
            }
        }

        function _createConsentText(cookieText) {
            var consentText = document.createElement('span');
            _setElementText(consentText, cookieText);
            return consentText;
        }

        function _createDismissLink(dismissText) {
            var dismissLink = document.createElement('a');
            _setElementText(dismissLink, dismissText);
            dismissLink.id = dismissLinkId;
            dismissLink.href = '#';
            dismissLink.style.marginLeft = '24px';
            return dismissLink;
        }

        function _createInformationLink(linkText, linkHref) {
            var infoLink = document.createElement('a');
            _setElementText(infoLink, linkText);
            infoLink.href = linkHref;
            infoLink.target = '_blank';
            infoLink.style.marginLeft = '8px';
            return infoLink;
        }

        function _dismissLinkClick() {
            _saveUserPreference();
            _removeCookieConsent();
            return false;
        }

        function _showCookieConsent(cookieText, dismissText, linkText, linkHref, isDialog) {
            if (_shouldDisplayConsent()) {
                _removeCookieConsent();
                var consentElement = (isDialog) ?
                    _createDialogElement(cookieText, dismissText, linkText, linkHref) :
                    _createHeaderElement(cookieText, dismissText, linkText, linkHref);
                var fragment = document.createDocumentFragment();
                fragment.appendChild(consentElement);
                document.body.appendChild(fragment.cloneNode(true));
                document.getElementById(dismissLinkId).onclick = _dismissLinkClick;
            }
        }

        function showCookieConsentBar(cookieText, dismissText, linkText, linkHref) {
            _showCookieConsent(cookieText, dismissText, linkText, linkHref, false);
        }

        function showCookieConsentDialog(cookieText, dismissText, linkText, linkHref) {
            _showCookieConsent(cookieText, dismissText, linkText, linkHref, true);
        }

        function _removeCookieConsent() {
            var cookieChoiceElement = document.getElementById(cookieConsentId);
            if (cookieChoiceElement != null) {
                cookieChoiceElement.parentNode.removeChild(cookieChoiceElement);
            }
        }

        function _saveUserPreference() {
            // Set the cookie expiry to one year after today.
            var expiryDate = new Date();
            expiryDate.setFullYear(expiryDate.getFullYear() + 1);
            document.cookie = cookieName + '=y;' + ' Path=/; SameSite=Strict; expires=' + expiryDate.toGMTString();
        }

        function _shouldDisplayConsent() {
            // Display the header only if the cookie has not been set.
            return !document.cookie.match(new RegExp(cookieName + '=([^;]+)'));
        }

        var exports = {};
        exports.showCookieConsentBar = showCookieConsentBar;
        exports.showCookieConsentDialog = showCookieConsentDialog;
        return exports;
    })();

    window.cookieChoices = cookieChoices;
    return cookieChoices;
})(this);
