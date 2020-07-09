import React from 'react';
import ReactDOM from 'react-dom';
import add from '../common/add';
import del from '../common/delete';

class IndexBox extends React.Component {
  render() {
    return (
      <div>
        <span>React test</span>
        <i>2020.12.34 56:78:90</i>
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
console.log(22222222222);
