<?php
	$xmlstr = file_get_contents('data/feedbee.xml');
	$bookshelf = new SimpleXMLElement($xmlstr);
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<title><?php echo htmlspecialchars($bookshelf->user->name); ?> — &lt;My Bookshelf&gt;</title>
	<link rel="stylesheet" href="css/styles.css" type="text/css" />
	<link rel="stylesheet" href="css/my-bookshelf.css" type="text/css" />
	<link rel="stylesheet" href="css/bookshelf.css" type="text/css" />
</head>
	
<body>
	<div id="page-wrapper">
		<div id="content-wrapper">
			<header>
				<div><img src="img/logo.png" class="mb-logo" />&lt;<strong>My Bookshelf</strong>&gt;</div>
			</header>
			<h1><?php if ($bookshelf->title) { echo htmlspecialchars($bookshelf->title) ; }
					else { echo htmlspecialchars($bookshelf->user->name); ?>'s Bookshelf<?php } ?></h1>
			
			<?php if (isset($bookshelf->intro)) {?>
			<p><em><?php echo nl2br(htmlspecialchars(trim($bookshelf->intro))); ?></em></p>
			<?php } ?>
			
			<?php if (count($bookshelf->books->book) < 1) { ?>
			<p><small>Bookshelf is empty.</small></p>
			<?php } else { ?>
			<ul class="bookshelf">
				<?php foreach ($bookshelf->books->book as $book) { ?>
				<li class="bookshelf-book">
					<a href="<?php echo $book->url; ?>"><img src="<?php echo $book->cover; ?>" alt="Обложка" class="bookshelf-book-cover" /></a>
					<div class="bookshelf-book-info">
						<h3 class="bookshelf-book-info-title bookshelf-name"><a href="<?php echo $book->url; ?>"><?php echo htmlspecialchars($book->name); ?></a></h3>
						<p class="bookshelf-book-info-authors">
							<?php $authorsCount = count($book->authors->author); $i = 0;
								foreach ($book->authors->author as $author) { ?>
								<a href="<?php echo $author->url; ?>"><?php echo htmlspecialchars($author->name); ?></a><?php if (++$i < $authorsCount) { ?>, <?php } ?>
							<?php } ?>
						</p>
						<p class="bookshelf-book-info-publication">
							Издательство <span class="bookshelf-name"><a href="<?php echo $book->publish->publisher->url; ?>">
							<?php echo htmlspecialchars($book->publish->publisher->name); ?></a></span>; <span class="bookshelf-pages"><?php echo $book->publish->pages; ?></span>; <span class="bookshelf-year"><?php echo $book->publish->year; ?></span>
						</p>
						<div class="bookshelf-raiting-outer">
							<div class="bookshelf-raiting-inner" style="width:<?php echo round((string)$book->my->rating) * 20; ?>%"></div>
						</div>
						<p class="bookshelf-review"><?php echo htmlspecialchars($book->my->review); ?></p>
					</div>
				</li>
				<?php } ?>
			</ul>
			<?php } ?>
		</div>
		<footer>&copy; <a href="http://valera.ws/" title="Personal blog" target="_blank">Valera Leontyev</a>, 2012. &lt;My Bookshelf&gt; application.</footer>
	</div>
</body>
</html>