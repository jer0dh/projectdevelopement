# A Project Development Task-based environment

A Gulp 4 based project development environment.  A good base for Wordpress theme or plugin development.

  * Runs lodash templats, node-sass, autoprefixer, and minifies `*.scss` files in `/src` as `*.css` files.
  * Babels, concatenates, and minifies javascript files into the `/dest` folder.  Arrays of the script paths defines the order of concatenation.
    * javascript files not defined in array are babeled and minified.
    * Any javascript files not defined in array and found under `/js/vendor` are minified only.
  * PHPLint and lodash templates are run on all php files and then copied to `/dest` folder.
  * All other files are copied to `/dest` folder
  * Watches are setup to run tasks when files change
  * Changed files are either sFTPed or RSynced to server destination.
  * After any change the patch version is bumped up in the `package.json`.


## Options
Most of the options are read from the `package.json` file.  The rest are in the `/gulpfile.js/config/index.js`


## Lodash templates
Gives the ability to add version and other information to the css or php files in the destination.  All `package.json` info and a config boolean called `production` is available.  For example, the `/gulpfile.js/config/index.js` contains a boolean called production to be set as `true` or `false`.  This could be used in a PHP file to determine whether PHP will use the minimized version of a script file or not.

```
  	$suffix = ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) ? '' : '<% if(production){%>.min<% } %>'; 
 	wp_enqueue_script( 'scripts', get_stylesheet_directory_uri() . "/js/scripts{$suffix}.js", array( 'jquery' ), $version, true );
```
For a Wordpress theme the style.css is automatically filled out with the values contained in the `package.json` file.  Here's the `style.scss` file used

```
/*!
	Theme Name: <%= pkg.templateName %>
	Theme URI: <%= pkg.templateUri %>
	Description: <%= pkg.description %>
	Author: <%= pkg.author %>
	Author URI: <%= pkg.authorUri %>
    Version: <%= pkg.version %>
	Tags:

	Template: genesis
	Template Version: <%= pkg.genesisVersion %>

	License: <%= pkg.license %>

*/


```

## Remote Deployment using sFTP or rSync
We mainly use rSync so sFTP hasn't been fully tested.  rSync is best used when you are able to exchange certificates with the host.  Here is an example a `rsync.json` file.

```
{
 "active"      : true,
 "hostname"  : "yourhostftpdomain.com",
  "username"  : "username",
  "port"      : 18763,
 "destination" : "~/pathonhost/"
  }
```

Here's an example of a `sftp.json` file.

```
{
  "active"  :  true,
  "hostname": "ftp.hostname.com",
  "user": "yourusername",
  "pass": "yourpassword",
  "remotePath": "/public_html/wp-content/themes",
  "port": "18763"
}
```

These files have been added to the `.gitignore` file so they are not added to your repo for all to see.