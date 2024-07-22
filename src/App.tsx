import Header from "./components/Header";
import useContacts from "./hooks/useContacts";
import ContactDialog from "./components/ContactDialog";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const { data } = useContacts();

  return (
    <>
      <div className="flex flex-col gap-6">
        <Header nbOfContacts={data.totalElements} />
        <AppRoutes />
      </div>
      <ContactDialog />
    </>
  );
}

export default App;
