<header>
  <nav id='header-nav' class='navbar navbar-default'>
    <div class='container'>
      <div class='navbar-header'>
        <a href='index.php' class='pull-left visible-xs visible-sm visible-md visible-lg'>
          <div id='logo-img'></div>
        </a>

        <div class='navbar-brand'>
          <a href='index.php'><h1>KEY MANAGEMENT</h1></a>
        </div>

        <button id='navbarToggle' type='button' class='navbar-toggle collapsed' data-toggle='collapse' data-target='#collapsable-nav'>
          <span class='sr-only'>Toggle navigation</span>
          <span class='icon-bar'></span>
          <span class='icon-bar'></span>

        </button>
      </div>

      <div id='collapsable-nav' class='collapse navbar-collapse'>
        <ul id='nav-list' class='nav navbar-nav navbar-right'>
          <li id='navHomeButton' class='visible-xs '>
            <a href='index.php'>
              <span class='glyphicon glyphicon-home'></span> Home</a>
          </li>
          <li id='navMenuButton'>
            <a href='#' onclick='$dc.loadMenuCategories();'>
              <span class='glyphicon glyphicon-align-justify'></span><br class='hidden-xs'> Menu</a>
          </li>
        </ul><!-- #nav-list -->
      </div><!-- .collapse .navbar-collapse -->
    </div><!-- .container -->
  </nav><!-- #header-nav -->
</header>
