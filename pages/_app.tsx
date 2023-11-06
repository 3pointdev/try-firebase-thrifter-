import Header from "components/header/header";
import Navigator from "components/navigation/navigator";
import { Provider } from "mobx-react";
import App from "next/app";
import { NextRouter, withRouter } from "next/router";
import "reflect-metadata";
import initializeStore, { RootStore } from "src/mobx/store";
import "styles/globals.css";

export interface IDefaultProps {
  headers: any;
  host: string;
  router: NextRouter;
  userAgent: string;
}
class MyApp extends App<any, any, any> {
  public mobxStore: RootStore;
  public router: NextRouter;

  static async getInitialProps(appContext: any) {
    const appProps = await App.getInitialProps(appContext);
    const headers =
      typeof window === "undefined"
        ? appContext.ctx.req.headers
        : window.navigator?.userAgent;
    return {
      ...appProps,
      headers: headers,
    };
  }

  constructor(props: any) {
    super(props);

    this.router = props.router;
    this.mobxStore = initializeStore({
      headers: props.headers,
      host: props.headers.host,
      userAgent: props.headers["user-agent"],
      router: props.router,
    });
  }

  render() {
    const { Component, pageProps, headers } = this.props;

    return (
      <Provider {...this.mobxStore}>
        <Header />
        <Component
          {...pageProps}
          headers={headers}
          version={process.env.NEXT_PUBLIC_VERSION}
          router={this.router}
        />
        <Navigator />
      </Provider>
    );
  }
}

export default withRouter(MyApp);
