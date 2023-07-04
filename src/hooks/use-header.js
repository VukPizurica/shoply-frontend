import MainHeaderUser from "../layouts/MainHeaderUser";
import MainHeaderBuyer from "../layouts/MainHeaderBuyer";
import MainHeaderSeller from "../layouts/MainHeaderSeller";


const useHeader = () => {
  const role = window.localStorage.getItem("role");

  if (role === 'ROLE_BUYER') {
    return <MainHeaderBuyer />;
  } else if (role === 'ROLE_SELLER') {
    return <MainHeaderSeller />
  } else {
    return <MainHeaderUser />
  }

};

export default useHeader;
