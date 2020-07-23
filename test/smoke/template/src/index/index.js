import React from 'react';
import ReactDOM from 'react-dom';
import add from '../common/add';
import del from '../common/delete';
import logo from '../assets/logo.png';

class IndexBox extends React.Component {
  render() {
    return (
      <div>
        <span>React test</span>
        <i>2020.12.34 56:78:90</i>
        <img src={"../" + logo} />
        <p>eslint test</p>
        <p>eslint test 1</p>
        <p>eslint test 2</p>
        <p>eslint test 3</p>
        <p>eslint test 4</p>
      </div>
    )
  }
}

ReactDOM.render(
  <IndexBox />,
  document.getElementById('root')
)

add();
del();
document.write('The index js.');
