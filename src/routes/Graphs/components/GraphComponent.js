import React from 'react'
import BarChartDemo from './BarChartDemo';
import DonutChartDemo from './DonutChartDemo';

export const GraphComponent = (props) => (
  <div style={{ margin: '0 auto' }} >
    <h2>Graph Container</h2>
    <BarChartDemo items={[
        { year: 2015, google: 25.5, intel: 10.5, facebook: 112.5 },
        { year: 2014, google: 30, intel: 48, facebook: 42 },
        { year: 2013, google: 65, intel: 18, facebook: 16 },
    ]} />
    <DonutChartDemo items={[
        { year: 2015, google: 25.5, intel: 10.5, facebook: 112.5 },
        { year: 2014, google: 30, intel: 48, facebook: 42 },
        { year: 2013, google: 65, intel: 18, facebook: 16 },
    ]} />
  </div>
)

export default GraphComponent
