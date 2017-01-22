import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Promise from 'bluebird';
import _ from 'lodash';
import classNames from 'classnames';

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

const images = requireAll(require.context('./img/JPEG', true, /\.(jpe?g|png|gif|svg|eot|woff2?|ttf)$/));

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: null,
      i: -1
    };
  }
  componentDidMount() {
    const $navWrap = this.$navWrap = $('.js-nav-wrap');
    const $navInner = this.$navInner = $('.js-nav-inner');
    $navWrap.on('mousemove', (e) => {
      const innerHeight = $navInner.outerHeight();
      const outerHeight = $navWrap.outerHeight();
      const scrollableDistance = innerHeight - outerHeight;
      // the 50 and 100 are to pad a little, guarantees you can scroll all the way top and bottom
      const percentScroll = (e.pageY - $navWrap.offset().top - 50) / (outerHeight - 100);
      $navInner.velocity('stop').velocity('scroll', { container: $navWrap, offset: percentScroll * scrollableDistance, duration: 50 });
    });
    document.addEventListener('keydown', (e) => this.handleKeyDown(e.key));
  }
  componentWillUnmount() {
    this.$navWrap.off('mousemove');
    document.removeEventListener('keydown', (e) => this.handleKeyDown(e.key));
  }
  handleKeyDown(key) {
    switch (key) {
      case 'ArrowRight':
        this.nextImg();
        break;
      case 'ArrowLeft':
        this.prevImg();
        break;
    }
  }
  chooseImg(i) {
    i = i || 0;
    const img = images[i];
    this.setState({
      img,
      i
    });
  }
  prevImg() {
    const i = this.state.i - 1;
    const img = images[i];
    this.setState({
      img,
      i
    });
  }
  nextImg() {
    const i = this.state.i + 1;
    const img = images[i];
    this.setState({
      img,
      i
    });
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row h-100">
          <div className="col-sm-2 col-md-1 nav-wrap js-nav-wrap">
            <div className="js-nav-inner">
              <div className="row">
                <div
                  className="col h-100 nav-img"
                  onClick={() => this.chooseImg(-1)}
                >
                  <p className="nav-top">Home</p>
                </div>
              </div>
              {images.map((img, i) => {
                return (
                  <div
                    className="row"
                    key={img.src}
                    onClick={() => this.chooseImg(i)}
                  >
                    <img
                      className={classNames('col', 'h-100', 'nav-img')}
                      srcSet={img}
                    />
                  </div>
                );
              })}
              <div className="row">
                <div
                  className="col h-100 nav-img"
                  onClick={() => this.chooseImg(-1)}
                >
                  <p className="nav-top">Home</p>
                </div>
              </div>
            </div>
          </div>
          {(() => {
            if (this.state.i === -1) {
              return (
                <div className="col-sm-10 col-md-11 home h-100">
                  <div className="home-top d-flex justify-content-between align-items-end">
                    <h1 className="display-3">Reid Roman <small className="text-muted">Photography</small></h1>
                    <ul className="nav">
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          onClick={() => this.chooseImg(0)}
                        >Photos
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="modal"
                          data-target=".about-modal"
                        >About
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="modal"
                          data-target=".contact-modal"
                        >Contact
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="home-bottom">
                  </div>
                </div>
              )
            } else {
              return (
                <div className="col-sm-10 col-md-11 d-flex align-items-center hidden-xs-down display-container">
                  <img
                    className="main-img"
                    srcSet={this.state.img.srcSet}
                  />
                  <i
                    className="material-icons left-chevron"
                    onClick={() => this.prevImg()}
                  >chevron_left
                  </i>
                  <i
                    className="material-icons right-chevron"
                    onClick={() => this.nextImg()}
                  >chevron_right
                  </i>
                </div>
              )
            }
          })()}
        </div>

        <div className="modal fade contact-modal">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Contact Reid</h5>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Reply To</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="pictureme@beautiful.com" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea className="form-control" id="message" rows="3"></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary">Send Message</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade about-modal">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">About Reid</h5>
              </div>
              <div className="modal-body">
                <p>
                  An avid perceiver of light, Reid finds beauty in contrast and
                  relief.
                </p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default withRouter(Index);
