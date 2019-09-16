import React from "react";

const Navbar = props => (
  <div id="header" className="ui massive secondary menu" role="navigation" aria-label="Main">
    <div className="ui container">
      <div className="item">
        <a href="/"></a>
      </div>
      <div className="item">
        <a href="/home/about"> About </a>
      </div>

      <div className="item">
        <a href="/home/faq"> F.A.Q </a>
      </div>

      <div className="item">
        <a href="/cem_map"> View Map </a>
      </div>

      <div className="right menu">
        <div className="item">
          <a href="/auth/login">
            <div className="ui red button">
              Sign in <i className="fas fa-sign-in-alt" style={{ color: "white" }}></i>
            </div>
          </a>
        </div>
        <div className="item">
          <a href="/auth/signup">
            <div className="ui red button">
              Sign Up <i class="fas fa-user-plus" style={{ color: "white" }}></i>
            </div>
          </a>
        </div>
        <div className="ui icon dropdown">
          <i className="fas fa-user-circle fa-2x"></i>
          <div className="menu">
            <div className="item">
              <a href="/home/account/<%=currentUser._id%>">
                Account <i className="fas fa-file"></i>
              </a>
            </div>
            <div className="item">
              <a href="/cem_map/new">
                Add a Pin! <i className="fas fa-map-pin"></i>
              </a>
            </div>
            <div className="divider"></div>
            <div className="header">Signed in as username</div>
            <div className="item">
              <a href="/auth/logout">
                Sign Out <i className="fas fa-sign-out-alt"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Navbar;
