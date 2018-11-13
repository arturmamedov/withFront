/**
 * withHoneyPot Spam Checker
 *
 * HTML:
 <div class="_the_email_confirm_group">
 <div class="form-group">
 <label class="upper" for="name">Email confirm</label>
 <input type="text" class="_the_email_confirm_" name="_the_email_confirm_" value="confirmed" />
 </div>
 </div>
 * HTML END;
 *
 * Example of check in PHP:
 $captcha_error = false;
 $maybe_js_error = false;
 if (isset($_POST['_the_email_confirm_']) && strlen($_POST['_the_email_confirm_']) > 0) {
             if ($_POST['_the_email_confirm_'] == 'confirmed') {
                 $maybe_js_error = true;
             } else {
                 $captcha_error = true;
                 $errors[] = 'Codice di sicurezza "CAPTCHA" non valido';
             }
         }
 if ( ! $captcha_error && ! $errors) {
             if ($maybe_js_error) {
                 // if error maybe spam
                 $email_to = 'buonemailrn@gmail.com';
             } else {
                 // send to owner
                 $email_to = $to;
             }
         }
 * PHP example END;
 *
 */
$("._the_email_confirm_").attr('value', '');
