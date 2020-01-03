import React from 'react';
import { observer } from 'mobx-react';
import Header from '../../../Index/Component/IndexHeader';
import Footer from '../../../Index/Component/IndexFooter';
import { HistoryInterface } from '../../../Utils/Interfaces';

import '../Style/RSRSComputeContainer.scss';

@observer
class RSRSComputeContainer extends React.Component<HistoryInterface> {
  render() {
    return (
      <div className="rsrs-container" >
        <Header history={this.props.history} />
        <div className="rsrs-main" >

        </div>
        <Footer />
      </div>
    );
  }
}

export default RSRSComputeContainer;
