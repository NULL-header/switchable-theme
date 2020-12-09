import { createUseStyles } from "react-jss";

// eslint-disable-next-line no-unused-vars
import { MassJSS, BranchArg, Theming } from "./types";

export const createMakeStyles = <
  UserTheming extends Theming<any> | undefined = undefined
>(
  theming?: UserTheming
) => <Props extends Record<string, any> | undefined = undefined>(
  props?: Props
) => <Styles extends Record<string, any>>(
  styles: UserTheming extends undefined
    ? MassJSS<Styles, Props>
    :
        | MassJSS<Styles, Props>
        | ((
            theme: UserTheming extends Theming<infer Theme> ? Theme : never
          ) => MassJSS<Styles, Props>)
) => {
  return createUseStyles<UserTheming>(styles as any, { theming }) as BranchArg<
    Styles,
    Props
  >;
};
