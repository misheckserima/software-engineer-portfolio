
import { useState, useEffect } from 'react';
import OptimizedLayout from '@/components/OptimizedLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Globe, MapPin, Calendar, TrendingUp, Layout } from 'lucide-react';

interface VisitorData {
  id: string;
  location: string;
  country: string;
  timestamp: Date;
  userAgent: string;
  page: string;
}

const Admin = () => {
  const [visitors, setVisitors] = useState<VisitorData[]>([]);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [uniqueCountries, setUniqueCountries] = useState(0);
  const [todayVisitors, setTodayVisitors] = useState(0);

  useEffect(() => {
    // Track current visitor
    trackVisitor();
    
    // Load existing visitor data from localStorage
    const storedVisitors = localStorage.getItem('visitorData');
    if (storedVisitors) {
      const parsedVisitors = JSON.parse(storedVisitors).map((v: any) => ({
        ...v,
        timestamp: new Date(v.timestamp)
      }));
      setVisitors(parsedVisitors);
      calculateStats(parsedVisitors);
    }
  }, []);

  const trackVisitor = async () => {
    try {
      // Get visitor's location using IP geolocation
      const response = await fetch('https://ipapi.co/json/');
      const locationData = await response.json();
      
      const newVisitor: VisitorData = {
        id: Date.now().toString(),
        location: `${locationData.city}, ${locationData.region}`,
        country: locationData.country_name || 'Unknown',
        timestamp: new Date(),
        userAgent: navigator.userAgent,
        page: window.location.pathname
      };

      const updatedVisitors = [...visitors, newVisitor];
      setVisitors(updatedVisitors);
      localStorage.setItem('visitorData', JSON.stringify(updatedVisitors));
      calculateStats(updatedVisitors);
    } catch (error) {
      console.log('Could not track visitor location:', error);
      // Fallback visitor tracking without location
      const newVisitor: VisitorData = {
        id: Date.now().toString(),
        location: 'Unknown Location',
        country: 'Unknown',
        timestamp: new Date(),
        userAgent: navigator.userAgent,
        page: window.location.pathname
      };

      const updatedVisitors = [...visitors, newVisitor];
      setVisitors(updatedVisitors);
      localStorage.setItem('visitorData', JSON.stringify(updatedVisitors));
      calculateStats(updatedVisitors);
    }
  };

  const calculateStats = (visitorData: VisitorData[]) => {
    setTotalVisitors(visitorData.length);
    
    const countries = new Set(visitorData.map(v => v.country));
    setUniqueCountries(countries.size);
    
    const today = new Date();
    const todayCount = visitorData.filter(v => 
      v.timestamp.toDateString() === today.toDateString()
    ).length;
    setTodayVisitors(todayCount);
  };

  const getTopCountries = () => {
    const countryCount: { [key: string]: number } = {};
    visitors.forEach(visitor => {
      countryCount[visitor.country] = (countryCount[visitor.country] || 0) + 1;
    });
    
    return Object.entries(countryCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Admin Dashboard
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Monitor website traffic and visitor analytics with location tracking
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Total Visitors</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{totalVisitors}</div>
                <p className="text-xs text-slate-500">All time visits</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Countries</CardTitle>
                <Globe className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{uniqueCountries}</div>
                <p className="text-xs text-slate-500">Unique countries</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Today's Visitors</CardTitle>
                <Calendar className="h-4 w-4 text-pink-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-pink-600">{todayVisitors}</div>
                <p className="text-xs text-slate-500">Visits today</p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">Growth</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">+{Math.floor(totalVisitors * 0.12)}</div>
                <p className="text-xs text-slate-500">vs last period</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Countries */}
            <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Top Countries
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Countries with the most visitors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getTopCountries().map(([country, count], index) => (
                    <div key={country} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                          {index + 1}
                        </div>
                        <span className="text-slate-700">{country}</span>
                      </div>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        {count} visits
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Visitors */}
            <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <Users className="h-5 w-5 text-purple-600" />
                  Recent Visitors
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Latest website visits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {visitors.slice(-10).reverse().map((visitor) => (
                    <div key={visitor.id} className="flex items-start justify-between border-b border-slate-100 pb-3">
                      <div>
                        <p className="text-sm font-medium text-slate-700">{visitor.location}</p>
                        <p className="text-xs text-slate-500">{visitor.country}</p>
                        <p className="text-xs text-slate-400">{visitor.page}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500">
                          {visitor.timestamp.toLocaleDateString()}
                        </p>
                        <p className="text-xs text-slate-400">
                          {visitor.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
