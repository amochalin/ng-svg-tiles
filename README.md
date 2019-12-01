# ng-svg-tiles

<b>Live version of this app can be found at <a href="https://svg-tiles.appspot.com/" target="_new">https://svg-tiles.appspot.com/</a></b>

This app is an experiment designed to test if Angular 2+ templates can be handy or at least usable for generating tile images in SVG format.

We call "tile image" an image which when replicated side by side in a grid creates the impression of a repetitive ornament where separate tiles can fit together seamlessly or, on the opposite, be themselves the main repetitive pattern.

SVG format is an open standard for vector graphics, it's "web native" i.e. supported by all modern browsers and can also be easily imported into professional graphic design software like Adobe Illustrator to be converted to a rasterized image or used in a larger graphic design project. It is also human readable; all this makes SVG a good choice for such a web-based tool.

## How to use it?

One needs to be familiar with SVG format and Angular 2 (or later Angular version) templates at least at some basic level; as Angular templates use expressiions closely resembling those of Javascript some Javascript knowledge would also be very useful.

The app starts with a demo template rendered and editable. It doesn't include the enclosing &lt;svg&gt;&lt;/svg&gt; tags and are added to the template by the app before rendering. The app replicates the SVG element generated from the template in a 3x3 grid so the user can see how the tiles fit together. The user can make app show tile borders (grid lines) and change tile dimensions. The resulting SVG code for a single tile can be saved locally by clicking "Save SVG" link.

