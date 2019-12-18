import React from 'react';
import { observer } from 'mobx-react';
import { HistoryInterface } from '../../../Utils/Interfaces';
import Header from '../../../Index/Component/IndexHeader';
import Footer from '../../../Index/Component/IndexFooter';
import "../Styles/GRUPredictAContainer.scss";

@observer
class GRUPredictAContainer extends React.Component<HistoryInterface> {
  render() {
    return (
      <div className="grupredict-a-container" >
        <Header history={this.props.history} />
        <div className="grupredict-a-main" >

        </div>
        <Footer />
      </div>
    );
  }
}

export default GRUPredictAContainer;
