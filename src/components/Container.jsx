import React, { Component } from 'react';
import filestack from 'filestack-js';
const API_KEY = 'Acu94EFL1STGYvkM6a8usz';

const client = filestack.init(API_KEY);
const processAPI = 'https://process.filestackapi.com';

export default class Container extends Component {

  constructor (props) {
    super(props);
    this.state = { handle : '', transformation: '' };
    this.handleUpload = this.handleUpload.bind(this);
  }

  filestack = () => {
    return client.pick(
      {
        accept: 'image/*',
        maxSize: 1024 * 1024 * 100,
      }
    );
  };

  async handleUpload () {
    try {
      const { filesUploaded } = await this.filestack();
      console.log(filesUploaded);
      this.setState({
        handle: filesUploaded[0].handle,
        url: `${processAPI}/${this.setTransformation()}`,
      });
    } catch (e) {
      console.log(e);
    }
  }

  setTransformation = () => {
    return `resize=w:${this.width.value}` +
      `,h:${this.height.value}` +
      `,fit:${this.fit.value}` +
      `,align:${this.align.value}`;
  }

  handleChange = () => {
    const { handle } = this.state;
    this.setState({ url: `${processAPI}/${this.setTransformation()}` });
  }

  render () {
    const { handle, url } = this.state;
    return (
      <div className="container">
        <div className="page-header">
          <h1>Filestack Resize, Fit and Align <small>in action</small></h1>
        </div>
        <div className="row">
          <div className="col-md-8 col-md-offset-2 text-center">
            <div className="thumbnail">
              <img
                className="img-responsive"
                src={(url && `${url}/${handle}`) || '//placehold.it/800x600?text=Picture'}
              />
            </div>
          </div>
        </div>
        <div className="row" onChange={this.handleChange}>
          <form action="/action_page.php">
            <div className="form-group">
              <label htmlFor="width">Width:</label>
              <input
                type="number"
                className="form-control"
                id="width"
                placeholder="800"
                name="width"
                defaultValue="800"
                ref={(input) => this.width = input}
              />
            </div>
            <div className="form-group">
              <label htmlFor="height">Height:</label>
              <input
                type="number"
                className="form-control"
                id="height"
                placeholder="600"
                name="height"
                defaultValue="600"
                ref={(input) => this.height = input}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fit">Fit:</label>
              <select
                className="form-control"
                id="fit"
                ref={(select) => this.fit = select}
              >
                <option>clip</option>
                <option>crop</option>
                <option>scale</option>
                <option>max</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="align">align:</label>
              <select
                className="form-control"
                id="align"
                ref={(select) => this.align = select}
              >
                <option>center</option>
                <option>top</option>
                <option>bottom</option>
                <option>left</option>
                <option>right</option>
                <option>faces</option>
              </select>
            </div>
          </form>
        </div>
        <div className="row">
          <div className="text-center">
            <button className="btn btn-filestack" onClick={this.handleUpload}>
              <i className="glyphicon glyphicon-upload" /> Upload
            </button>
          </div>
        </div>
      </div>
    );
  }
}
