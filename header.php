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
          <li id='navHomeButton' class='hidden-xs' >
            <a href='index.php'>
              <span class='glyphicon glyphicon-home'></span> Home
            </a>
          </li>
          <li id='navMenuButton' class="dropdown">            
            <a href="#" class="dropdown-toggle hidden-xs" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
              <span class='glyphicon glyphicon-align-justify'></span><br class='hidden-xs'> Menu
            </a>
            <ul class="dropdown-menu menu hidden-xs">
              <li><a href="index.php">Actividades</a></li>
              <li><a href="usuario.php">Usuarios</a></li>
              <li><a href="slot.php">Slots</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">Administrar</a></li>
            </ul>
            
            <li class='visible-xs'><a href="index.php">Actividades</a></li>
            <li class='visible-xs'><a href="usuario.php">Usuarios</a></li>
            <li class="visible-xs"><a href="slot.php">Slots</a></li>
            <li role="separator" class="divider visible-xs"></li>
            <li class='visible-xs'><a href="#">Administrar</a></li>
            
          </li>
        </ul><!-- #nav-list -->
      </div><!-- .collapse .navbar-collapse -->
    </div><!-- .container -->
  </nav><!-- #header-nav -->
</header>
