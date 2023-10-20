// component
import SvgColor from "../../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: icon("ic_analytics"),
  },
  {
    title: "user",
    path: "/dashboard/user",
    icon: icon("ic_user"),
  },
  { title: "orders", path: "/dashboard/orders", icon: icon("ic_cart") },
  {
    title: "product",
    path: "/dashboard/products",
    icon: icon("ic_product"),
  },
];

export default navConfig;
