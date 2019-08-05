<?php
/*
----- SVG Get Contents
Similar to file_get_contents, but with a few SVG & WP specific modificaitons:
- creates unique IDs for SVG style elements (gradient definitions) to avoid in-page display conflicts.
- if an IMG object is passed, will look for Title and Description, and add them to SVG along with appropriate aria tags for screen readers.
*/
function svg_get_contents( $img ){

	// if passed as an IMG object get URL property, else assume plain url of SVG was passed
	$url = '';
	if(is_array($img)){
		$url = $img['url'];
	} else {
		$url = $img;
	}

	// get the SVG markup
	$graphicOrig = file_get_contents( $url );

	if(is_array($img)){

		// if title and description are present, set them up then combine them into meta values
		$title = '';
		$description = '';
		$meta = '';
		$svgAtts = '';

		if($img['title']){
			$title = '<title id="svgtitle">'. $img['title'] .'</title>';
			$meta .= $title;
			$svgAtts .= ' aria-labelledby="title"';
		}

		if($img['description']){
			$description = '<desc id="svgdescription">'. $img['description'] .'</desc>';
			$meta .= $description;
			$svgAtts .= ' aria-describedby="desc"';
		}

		// if <desc> element exists, and we have a replacement, first remove the existing element
		if(strpos($graphicOrig, '<desc') !== false && $description){
			$graphicOrig = preg_replace('(<desc.*<\/desc>)', '', $graphicOrig);
		}

		// add our custom meta, either in place of the existing title, or if SVG lacks title, then after the opening SVG tag
		if(strpos($graphicOrig, '<title') !== false && $title){
			$graphicOrig = preg_replace('(<title.*<\/title>)', $meta, $graphicOrig);
		} else {
			// If no title exists, add our meta after opening svg tag
			$graphicOrig = preg_replace('(<svg [^>]*>)', '$0'.$meta, $graphicOrig);
		}

		if($svgAtts){
			$graphicOrig = preg_replace('(<svg [^>]*)', '$0'.$svgAtts, $graphicOrig);
		}
		//TODO add aria-labelledby="title" aria-describedby="desc" to svg element
	}

	// in SVG, styles and gradients are referenced internally in the <defs> element via ID attributes. When the same SVG is embedded multiple times on a page, or loaded multiple times via ajax loading, the IDs can clash in some browsers. This will ensure each instance has unique IDs
	$stringParts = explode('defs', $graphicOrig);

	// random number to append to all style IDs in this SVG
	$rand = rand(100, 999);

	// apply number to IDs in <defs> element
	$stringParts[1] = str_replace('id="', 'id="'.$rand, $stringParts[1]);

	// apply number to ID references via url(#) in the rest of SVG
	$stringParts[2] = str_replace('url(#', 'url(#'.$rand, $stringParts[2]);

	// put Humpty back together again
	$graphic = implode('defs', $stringParts);

	return $graphic;
}
