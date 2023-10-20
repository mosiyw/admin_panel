import { IconButton } from "@mui/material";
import useDarkMode from "../../../hooks/useDarkMode";
import Iconify from "../../../components/iconify";

export default function ToggleDark() {
  const [isDark, { toggle }] = useDarkMode();

  return (
    <IconButton onClick={toggle} sx={{ width: 40, height: 40 }}>
      {!isDark ? <Iconify icon="solar:moon-bold-duotone" /> : <Iconify icon="solar:sun-bold-duotone" />}
    </IconButton>
  );
}
