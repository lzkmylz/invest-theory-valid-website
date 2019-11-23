import React from 'react';
import { observer } from 'mobx-react';
import Header from '../../../Index/Component/IndexHeader';
import Footer from '../../../Index/Component/IndexFooter';

interface Iprops {
  history: {
    push(url: String): Function
  }
}

@observer
class SimilarityComputeContainer extends React.Component<Iprops> {

  render() {
    return (
      <div className="similarity-compute-container" >
        <Header history={this.props.history} />
        <div className="similarity-compute-main" >
          Test
        </div>
        <Footer />
      </div>
    )
  }
}

export default SimilarityComputeContainer;
