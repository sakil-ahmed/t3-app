export default function AnalyticsPage({
  params,
}: {
  params: { slug: string };
}) {
  console.log(params);
  return <p>Analytics Page</p>;
}
