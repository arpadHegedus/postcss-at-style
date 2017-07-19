/**
 * POSTCSS AT STYLE
 * A PostCSS plugin to add mixin-like modules that can be included
 * @version 1.0.0
 * @author Arpad Hegedus <hegedus.arpad@gmail.com>
 */

let postcss = require('postcss');

module.exports = postcss.plugin('postcss-at-style', () => {
    return css => {
        let styles = {};
        css.walkAtRules('style', atrule => { 
            styles[atrule.params] = atrule.toString().trim().replace(`@style ${atrule.params} {`, '').trim().slice(0, -1);
            atrule.remove();
        });
        css.walkDecls('style', decl => {
            if (styles.hasOwnProperty(decl.value)) { 
                decl.before(styles[decl.value]);
            }
            decl.remove();
        });
    }
});