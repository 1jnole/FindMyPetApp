<?php
interface EntityInterfaceADO{
	public static function fromResultSetList( $res );
	public static function fromResultSet( $res );
	public static function findByQuery($cons, $vector);
	public static function findAll();
	public function create($entity);
	public function delete($entity);
	public function update($entity);
}
?>
