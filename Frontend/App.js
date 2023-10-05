import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import AdminDashBoard from './components/AdminDashBoard/AdminDashBoard';
import AgentDashBoard from './components/AgentDashBoard/AgentDashBoard';
import CustomerDashBoard from './components/CustomerDashBoard/CustomerDashBoard';
import Home from './components/Home/Home';
import { Route, Routes } from 'react-router';
import EmployeeDashBoard from './components/EmployeeDashBoard/EmployeeDashBoard';
import Employee from './components/Employee/Employee';
import Agent from './components/Agent/Agent';
import Customer from './components/Customer/Customer';
import Payment from './components/Payment/Payment';
import Claim from './components/Claim/Claim';
import Plan from './components/Plan/Plan';
import Scheme from './components/Scheme/Scheme';
import BuyPlan from './components/BuyPlan/BuyPlan';
import Documents from './components/Documents/Documents';
import Receipt from './components/Receipt/Receipt';
import Policy from './components/Policy/Policy';
import Premium from './components/Premium/Premium';
import PremiumPay from './components/PremiumPay/PremiumPay';
import QueryForm from './components/Query/QueryForm';
import RegisterCustomer from './components/RegisterCustomer/RegisterCustomer';
import AgentCustomers from './components/AgentCustomers/AgentCustomers';
import RegisterPolicy from './components/RegisterPolicy/RegisterPolicy';
import AgentProfile from './components/AgentProfile/AgentProfile';
import Marketing from './components/Marketing/Marketing';
import Commission from './components/Commission/Commission';
import { Spinner } from './components/Spinner';
import Withdrawals from './components/Withdrawals/Withdrawals';
import EmployeeProfile from './components/EmployeeProfile/EmployeeProfile';
import EmployeeQuery from './components/EmployeeQuery/EmployeeQuery';
import CustomerProfile from './components/CustomerProfile/CustomerProfile';
import CustomerClaims from './components/CustomerClaims/CustomerClaims';
import AdminProfile from './components/AdminProfile/AdminProfile';
import CustomerRegistration from './components/CustomerRegistration/CustomerRegistration';
import ContactUs from './components/ContactUs/ContactUs';
import AboutUs from './components/AboutUs/AboutUs';
import HomePlan from './components/HomePlan/HomePlan';
import HomeScheme from './components/HomeScheme/HomeScheme';

function App() {
  return (
    <>
    <Routes>
      <Route element={<Spinner/>}></Route>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login/:role' element={<Login/>}></Route>
      <Route path='/adminDashBoard/:username' element={<AdminDashBoard/>}></Route>
      <Route path='/plan/:username' element={<Plan/>}></Route>
      <Route path='/employee/:username' element={<Employee/>}></Route>
      <Route path='/agent/:username' element={<Agent/>}></Route>
      <Route path='/customer/:username' element={<Customer/>}></Route>
      <Route path='/policy/:username' element={<Policy/>}></Route>
      <Route path='/payment/:username' element={<Payment/>}></Route>
      <Route path='/claim/:username' element={<Claim/>}></Route>
      <Route path='/scheme/:username/:planid' element={<Scheme/>}></Route>
      <Route path='/buyplan/:username/:object' element={<BuyPlan/>}></Route>
      <Route path='/documents/:username/:customerid' element={<Documents/>}></Route>
      <Route path='/agentDashBoard/:username' element={<AgentDashBoard/>}></Route>
      <Route path='/employeeDashBoard/:username' element={<EmployeeDashBoard/>}></Route>
      <Route path='/customerDashBoard/:username' element={<CustomerDashBoard/>}></Route>
      <Route path='/receipt/:username/:val/:object' element={<Receipt/>}></Route>
      <Route path='/premium/:username/:policynumber' element={<Premium/>}></Route>
      <Route path='/premiumpayment/:username/:policynumber' element={<PremiumPay/>}></Route>
      <Route path='/query/:username' element={<QueryForm/>}></Route>
      <Route path='/register/:username' element={<RegisterCustomer/>}></Route>
      <Route path='/agentCustomers/:username' element={<AgentCustomers/>}></Route>
      <Route path='/registerPolicy/:username' element={<RegisterPolicy/>}></Route>
      <Route path='/agentProfile/:username' element={<AgentProfile/>}></Route>
      <Route path='/marketing/:username' element={<Marketing/>}></Route>
      <Route path='/commission/:username' element={<Commission/>}></Route>
      <Route path='/withdrawal/:username' element={<Withdrawals/>}></Route>
      <Route path='/employeeProfile/:username' element={<EmployeeProfile/>}></Route>
      <Route path='/employeeQuery/:username' element={<EmployeeQuery/>}></Route>
      <Route path='/customerProfile/:username' element={<CustomerProfile/>}></Route>
      <Route path='/customerClaims/:username' element={<CustomerClaims/>}></Route>
      <Route path='/adminProfile/:username' element={<AdminProfile/>}></Route>
      <Route path='/register' element={<CustomerRegistration/>}></Route>
      <Route path='/contact' element={<ContactUs/>}></Route>
      <Route path='/about' element={<AboutUs/>}></Route>
      <Route path='/plan' element={<HomePlan/>}></Route>
      <Route path='/scheme/:planid' element={<HomeScheme/>}></Route>
    
    </Routes>
    {/* <Receipt/> */}
    </>
  );
}

export default App;
