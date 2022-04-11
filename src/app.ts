import { Database } from './design-patterns/singleton'

const foo = Database.getInstance()
foo.query('select *')

const bar = Database.getInstance()
bar.query('insert into')