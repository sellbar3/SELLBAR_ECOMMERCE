"use client";
import { useParams } from "next/navigation";
import PanelShell from "../../../../components/PanelShell";
import ProductForm from "../../../../components/ProductForm";

export default function EditProduct() {
  const { id } = useParams();
  return (
    <PanelShell role="vendor" title="Edit Product">
      {(session) => <ProductForm session={session} productId={id} />}
    </PanelShell>
  );
}
