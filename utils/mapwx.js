import MapWX from "../common/qqmap-wx-jssdk.min";
import { config } from "../config";

export const mapwx = new MapWX({
  key: config.mapKey
});
