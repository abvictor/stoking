import { ReactNode } from "react";

export const HeaderTitle = ({children}: {children: ReactNode}) => {
    return <h2 className="text-xl font-semibold">{children}</h2>;
}

export const HeaderSubtitle = ({ children }: { children: ReactNode }) => {
  return <span className="text-sm font-semibold text-slate-500">{children}</span>;
};

export const HeaderLeft = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};
export const HeaderRight = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between rounded-md bg-white p-2">
        {children}
      </div>
    </div>
  );
};

export default Header;