import React from "react";

/* Component: NavBar.
 * Tools - BOOTSTRAP, HTML, CSS
 *
 * Navbar that is used to navigate to different pages instantly.
 * This is a responsive content and navigates to only two pages. source code and about developer page.
 * Refreshes the application when clicked on brand name (Image Gallery).
 * Built with bootstrap and added CSS*/

class Navbar extends React.Component {
    render() {
        return (
            <span>
                <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" id="Nav-link" href={process.env.PUBLIC_URL}>Image Gallery
                    </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="nav navbar-nav ml-auto w-100 justify-content-end">
                            <li class="nav-item active">
                                <a id="Nav-link" class="nav-link" target="_blank" href="https://github.com/tdshivendran/image-gallery" rel="noopener noreferrer" >Source Code</a>
                            </li>
                            <li class="nav-item active">
                                <a id="Nav-link" class="nav-link" target="_blank" href="https://tdshivendran.github.io/aboutme/" rel="noopener noreferrer" >About Developer</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </span>
        );
    }
}

export default Navbar;