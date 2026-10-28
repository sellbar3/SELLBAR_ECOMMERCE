"use client";
import PanelShell from "../../../../components/PanelShell";
import ProductForm from "../../../../components/ProductForm";

export default function NewProduct() {
  return (
    <PanelShell role="vendor" title="Add Product">
      {(session) => <ProductForm session={session} />}
    </PanelShell>
  );
}
