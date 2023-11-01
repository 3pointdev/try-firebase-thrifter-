import Header from "components/header/header";
import App from "next/app";
import { NextRouter, withRouter } from "next/router";
import "styles/globals.css";

class MyApp extends App<any, any, any> {
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
  }

  componentDidMount(): void {}

  render() {
    const { Component, pageProps, headers } = this.props;

    return (
      <>
        <Header />
        <Component
          {...pageProps}
          headers={headers}
          version={process.env.NEXT_PUBLIC_VERSION}
          router={this.router}
        />
      </>
    );
  }
}

export default withRouter(MyApp);
