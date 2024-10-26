import { Scan, AlertCircle, Leaf, Activity } from 'lucide-react';

interface HealthMetric {
  label: string;
  value: number;
  status: 'good' | 'warning' | 'critical';
}

export default function SatelliteAnalysis() {
  const healthMetrics: HealthMetric[] = [
    { label: 'Crop Health Index', value: 87, status: 'good' },
    { label: 'Disease Risk', value: 12, status: 'warning' },
    { label: 'Growth Rate', value: 92, status: 'good' },
    { label: 'Soil Quality', value: 78, status: 'good' }
  ];

  return (
    <div>
      <div>
        <h2 className="title">Satellite Analysis</h2>
      </div>

      <div>
        {/* Satellite Image */}
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1570586437263-ab629fccc818?auto=format&fit=crop&q=80" 
            alt="Farm Satellite View"
            className="w-full h-64 object-cover rounded-lg"
          />
          <div>
            <div>
              <p className="updatetime">Last Updated: Today, 10:30 AM</p>
              <p className="resoval">Resolution: 0.5m/pixel</p>
            </div>
          </div>
        </div>

        {/* Health Metrics */}
        <div>
          {healthMetrics.map((metric, index) => (
            <div key={index}>
              <div>
                <span className={`h-2 w-2 rounded-full ${
                  metric.status === 'good' ? 'bg-green-500' :
                  metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
                <span className="metriclab">{metric.label}</span>
              </div>
              <p className="metricval">{metric.value}%</p>
            </div>
          ))}
        </div>

        {/* Disease Detection */}
        <div>
          <div>
            <AlertCircle/>
            <h3 className="warningtitle">Early Warning</h3>
          </div>
          <p className="warning">Potential early signs of leaf blight detected in the northeast section.</p>
        </div>
      </div>
    </div>
  );
}
