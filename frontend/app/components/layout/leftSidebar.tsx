import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

export default function LeftSidebar() {
  return (
    <aside className="w-full md:w-64 border-r px-4 py-6 space-y-6 text-sm bg-white">
      <div className="space-y-3">
        <div className="flex items-start space-x-2">
          <Checkbox id="merge" />
          <div>
            <Label htmlFor="merge" className="font-medium">
              Merge by supplier
            </Label>
            <p className="text-xs text-muted-foreground">
              Only the most relevant item from each supplier will be shown
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold">Store reviews</h4>
        <p className="text-xs text-muted-foreground">Based on a 5-star rating system</p>
        <RadioGroup defaultValue="4.0">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4.0" id="r1" />
            <Label htmlFor="r1">4.0 & up</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4.5" id="r2" />
            <Label htmlFor="r2">4.5 & up</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="5.0" id="r3" />
            <Label htmlFor="r3">5.0</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold">Product features</h4>
        <div className="flex items-center space-x-2">
          <Checkbox id="paid-samples" />
          <Label htmlFor="paid-samples">Paid samples</Label>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold">Categories</h4>
        <ul className="space-y-1 text-muted-foreground">
          {[
            'Used Mobile Phones',
            '5G smartphone',
            '3G&4G smartphone',
            'Smart Rings',
            'Rugged phone',
            'Feature Phone',
          ].map((cat) => (
            <li key={cat}>
              <button className="text-left hover:underline">{cat}</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold">Price</h4>
        <div className="flex items-center gap-2">
          <Input placeholder="Min." className="w-full text-sm" />
          <span>-</span>
          <Input placeholder="Max." className="w-full text-sm" />
          <Button size="sm" className="rounded-full px-3">
            OK
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold">Min. order</h4>
        <div className="flex gap-2">
          <Input placeholder="e.g. 10" className="w-full text-sm" />
          <Button size="sm" className="rounded-full px-3">
            OK
          </Button>
        </div>
      </div>
    </aside>
  );
}
