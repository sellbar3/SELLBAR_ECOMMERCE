"use client";
import { Suspense } from "react";
import { useParams } from "next/navigation";
import PanelShell from "../../../../components/PanelShell";
import ProductForm from "../../../../components/ProductForm";

function EditProductContent() {
  const { id } = useParams();
  return (
    <PanelShell role="vendor" title="Edit Product">
      {(session) => <ProductForm session={session} productId={id} />}
    </PanelShell>
  );
}

export default function EditProduct() {
  return (
    <Suspense fallback={<p className="pn-loading">Loading...</p>}>
      <EditProductContent />
    </Suspense>
  );
}
