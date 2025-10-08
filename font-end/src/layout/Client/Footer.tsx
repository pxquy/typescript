import logo from "../../assets/images/logoShop.jpg";
import face from "../../assets/images/facebook.jpg";
import tiktok from "../../assets/images/tiktok.jpg";
import youtube from "../../assets/images/youtube.jpg";
import intagram from "../../assets/images/intargram.jpg";

const Footer = () => {
  return (
    <div className="bg-amber-100 h-100 pl-35 mt-10">
      <div className="flex justify-between">
        <div className="p-10">
          <img
            src={logo}
            alt="Logo Shop"
            className="w-20 rounded-full h-19 rounded-full"
          />
        </div>
        <div className="p-10">
          <h2 className="font-bold p-2">NỀN TẢNG XÃ HỘI</h2>
          <div className="flex items-center gap-3 mr-35">
            <img
              src={face}
              alt="Facebook"
              className="w-12 rounded-full rounded cursor-pointer"
            />
            <img
              src={tiktok}
              alt="tiktok"
              className="w-10 rounded-full rounded cursor-pointer"
            />
            <img
              src={youtube}
              alt="youtube"
              className="w-10 rounded-full rounded cursor-pointer"
            />
            <img
              src={intagram}
              alt="intagram"
              className="w-10 rounded-full rounded cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-30 items-center">
        <div className="pl-10">
          <h2 className="font-bold pb-5">THÔNG TIN LIÊN HỆ</h2>
          <div className="flex flex-col gap-3">
            <span>
              <b>SĐT:</b> 0399013389
            </span>
            <span>
              <b>Địa chỉ CS1: </b> Hà Nội
            </span>
            <span>
              <b>Địa chỉ CS1: </b> Sài Gòn
            </span>
            <span>
              <b>Địa chỉ CS1: </b> Nam Định
            </span>
          </div>
        </div>
        <div className="pl-10">
          <h2 className="font-bold pb-5">THÔNG TIN LIÊN HỆ</h2>
          <div className="flex flex-col gap-3">
            <span>
              <b>SĐT:</b> 0399013389
            </span>
            <span>
              <b>Địa chỉ CS1: </b> Hà Nội
            </span>
            <span>
              <b>Địa chỉ CS1: </b> Sài Gòn
            </span>
            <span>
              <b>Địa chỉ CS1: </b> Nam Định
            </span>
          </div>
        </div>
        <div className="pl-10">
          <h2 className="font-bold pb-5">THÔNG TIN LIÊN HỆ</h2>
          <div className="flex flex-col gap-3">
            <span>
              <b>SĐT:</b> 0399013389
            </span>
            <span>
              <b>Địa chỉ CS1: </b> Hà Nội
            </span>
            <span>
              <b>Địa chỉ CS1: </b> Sài Gòn
            </span>
            <span>
              <b>Địa chỉ CS1: </b> Nam Định
            </span>
          </div>
        </div>
        <div className="pl-10">
          <h2 className="font-bold pb-5">THÔNG TIN LIÊN HỆ</h2>
          <div className="flex flex-col gap-3">
            <span>
              <b>SĐT:</b> 0399013389
            </span>
            <span>
              <b>Địa chỉ CS1: </b> Hà Nội
            </span>
            <span>
              <b>Địa chỉ CS1: </b> Sài Gòn
            </span>
            <span>
              <b>Địa chỉ CS1: </b> Nam Định
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
