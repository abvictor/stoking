import Header, {
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from "./_components/header";


export default function Home() {
  return (
    <div className="w-full space-y-2 p-8">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Visão geral das vendas</HeaderSubtitle>
          <HeaderTitle>Dashboard</HeaderTitle>
        </HeaderLeft>
      </Header>
    </div>
  );
}
