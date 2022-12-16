/** @format */
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      selected: "",
      field: `name`,
      loading: false,
    };
  }

  handleClick = () => {
    this.getUser();
  };

  handleSelect = (field, value) => {
    this.setState({ field: field, selected: value });
  };

  getUser = async () => {
    try {
      const res = await fetch(`https://randomuser.me/api/`);
      const data = await res.json();

      this.setState({
        user: data.results[0],
        field: `name`,
        selected: data.results[0].name.first,
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getUser();
  }
  render() {
    return (
      <main>
        <section className="upperHeroSection"></section>

        <section className="lowerHeroSection">
          <div className="infoCnt">
            <div className="profileImgCnt">
              <figure>
                <img
                  className="img"
                  src={this.state.user && this.state.user.picture.medium}
                  alt={this.state.user && this.state.user.name.first}
                />
              </figure>
            </div>

            <div className="userInfoCnt">
              <div className="userIntroCnt">
                <span className="userIntro">
                  My {this.state.user && this.state.field} is
                </span>

                <h2>
                  {this.state.selected
                    ? this.state.selected
                    : this.state.user
                    ? this.state.user.name.first
                    : `no user found`}
                </h2>
              </div>

              <div className="infoIconCnt">
                <span
                  className="iconSpaniconSpan"
                  onClick={() =>
                    this.handleSelect(`age`, this.state.user.dob.age)
                  }
                >
                  <i className="fa-solid fa-user"></i>
                </span>
                <span
                  onClick={() =>
                    this.handleSelect(`email`, this.state.user.email)
                  }
                >
                  <i className="fa-solid fa-envelope"></i>
                </span>
                <span
                  onClick={() =>
                    this.handleSelect(`city`, this.state.user.location.city)
                  }
                >
                  <i className="fa-solid fa-calendar-xmark"></i>
                </span>

                <span
                  onClick={() =>
                    this.handleSelect(
                      `street`,
                      this.state.user.location.street.name +
                        `-` +
                        this.state.user.location.street.number
                    )
                  }
                >
                  <i className="fa-solid fa-calendar-check"></i>
                </span>
                <span
                  onClick={() =>
                    this.handleSelect(`phone`, this.state.user.phone)
                  }
                >
                  <i className="fa-solid fa-phone-flip"></i>
                </span>
                <span
                  onClick={() =>
                    this.handleSelect(
                      `password`,
                      this.state.user.login.password
                    )
                  }
                >
                  <i className="fa-solid fa-lock"></i>
                </span>
              </div>
              <button onClick={this.handleClick}>
                {this.state.user ? `random user` : `Loading...`}
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default App;
