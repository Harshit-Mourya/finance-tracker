import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function setBudgetForm({
  form,
  handleChange,
  handleSubmit,
  categories,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Set Monthly Budget</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Category</Label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full bg-gray-900 text-white border border-gray-700 rounded-md px-4 py-2"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label>Month</Label>
            <Input
              type="month"
              name="month"
              value={form.month}
              onChange={handleChange}
              min={new Date().toISOString().slice(0, 7)}
            />
          </div>

          <div className="space-y-2">
            <Label>Amount</Label>
            <Input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="Enter amount"
            />
          </div>

          <Button type="submit" className="w-full cursor-pointer">
            Save Budget
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
